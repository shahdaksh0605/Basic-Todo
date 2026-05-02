const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/todoV2')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// Routes
app.get('/', async (req, res) => {
    try {
        // Sort by newest first
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.render('index', { tasks, error: req.query.error || null });
    } catch (err) {
        res.status(500).send("Database Error");
    }
});

app.post('/add', async (req, res) => {
    try {
        if (!req.body.title.trim()) {
            return res.redirect('/?error=Title cannot be empty');
        }
        await Task.create({
            title: req.body.title,
            description: req.body.description
        });
        res.redirect('/');
    } catch (err) {
        res.redirect('/?error=Error saving task');
    }
});

app.post('/complete/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task.completed) {
            return res.redirect('/?error=Task already finished!');
        }
        task.completed = true;
        await task.save();
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }
});

app.post('/delete/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));