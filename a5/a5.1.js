const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const port = 3000;

let books = [
    { isbn: "978-3-16-148410-0", title: "Example Book", year: 2021, author: "John Doe" },
    { isbn: "978-0-596-52068-7", title: "Learning JavaScript Design Patterns", year: 2012, author: "Addy Osmani" },
    { isbn: "978-0-201-63361-0", title: "Design Patterns: Elements of Reusable Object-Oriented Software", year: 1994, author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides" },
    { isbn: "978-0-134-56824-3", title: "Clean Code: A Handbook of Agile Software Craftsmanship", year: 2008, author: "Robert C. Martin" },
    { isbn: "978-0-262-03384-8", title: "Structure and Interpretation of Computer Programs", year: 1996, author: "Harold Abelson, Gerald Jay Sussman, Julie Sussman" },
    { isbn: "978-0-131-86830-9", title: "Computer Networks", year: 2016, author: "Andrew S. Tanenbaum, David J. Wetherall" },
    { isbn: "978-1-491-92727-9", title: "Fluent Python: Clear, Concise, and Effective Programming", year: 2015, author: "Luciano Ramalho" },
    { isbn: "978-0-596-52767-7", title: "JavaScript: The Good Parts", year: 2008, author: "Douglas Crockford" },
    { isbn: "978-1-449-36160-3", title: "Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript", year: 2012, author: "David Herman" },
    { isbn: "978-1-593-27111-4", title: "Programming Python", year: 2010, author: "Mark Lutz" }
];

app.get('/books', (req, res) => {
    res.json(books)
})

app.get('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    res.json(book);
})

app.post('/books', (req, res) => {
    const {isbn, title, year, author} = req.body;
    if (!isbn || !title || !year || !author) {
        return res.send('Input all fields');
    }
    const exists = books.some(b => b.isbn === isbn);
    if (exists) {
        return res.send('Book already exists');
    }
    const book = {isbn, title, year, author}
    books.push(book)
    res.json(book)
})

/*
app.put('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    const {title, year, author} = req.body;
    if (book) {
        if (!title || !year || !author) {
            return res.send('Input all fields (title, year, author');
        }
        book.title = title;
        book.year = year;
        book.author = author;
        res.json(book);
    } else {
        res.send('Book does not exist')
    }
})
*/

app.put('/books/:isbn', (req, res) => {
    const { title, year, author } = req.body;
    if (!title || !year || !author) {
        return res.send('All fields are required');
    }
    let updatedBook = null;
    books = books.map(book => {
        if (book.isbn === req.params.isbn) {
            updatedBook = { ...book, title, year, author };
            return updatedBook;
        }
        return book;
    });

    if (!updatedBook) {
        return res.send('Book not found');
    }
    res.json(updatedBook);
});



/*
app.delete('/books/:isbn', (req, res) => {
    const index = books.findIndex(b => b.isbn === req.params.isbn);
    if (index !== -1) {
        books.splice(index, 1)
        res.send('Book removed')
    } else {
        res. send('Book not found')
    }
})
*/

app.delete('/books/:isbn', (req, res) => {
    const initialLength = books.length;
    books = books.filter(book => book.isbn !== req.params.isbn);
    if (books.length === initialLength) {
        return res.send('Book not found');
    }
    res.send();
});






app.patch('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    const {title, year, author} = req.body;
    if (book) {
        if (title) book.title = title;
        if (year) book.year = year;
        if (author) book.author = author;
        res.json(book);
    } else {
        res.send('Book does not exist')
    }
})













app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});