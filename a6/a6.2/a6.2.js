const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}))




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
        return res.status(400).send('Input all fields');
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


/* a5.2 ab hier */

let lends = [
    {
        id: 1,
        customer_id: 101,
        isbn: "978-3-16-148410-0",
        borrowed_at: "2024-04-01T10:00:00Z",
        returned_at: null
    },
    {
        id: 2,
        customer_id: 102,
        isbn: "978-0-596-52068-7",
        borrowed_at: "2024-03-25T15:30:00Z",
        returned_at: "2024-04-05T14:00:00Z"
    },
    {
        id: 3,
        customer_id: 103,
        isbn: "978-0-201-63361-0",
        borrowed_at: "2024-03-20T11:00:00Z",
        returned_at: null
    },
    {
        id: 4,
        customer_id: 104,
        isbn: "978-0-134-56824-3",
        borrowed_at: "2024-03-22T16:00:00Z",
        returned_at: null
    },
    {
        id: 5,
        customer_id: 105,
        isbn: "978-0-262-03384-8",
        borrowed_at: "2024-02-10T12:00:00Z",
        returned_at: "2024-02-24T12:00:00Z"
    }
];

app.get('/lends', (res, req) => {
    res.json(lends)
})

app.get('/lends/:id', (req, res) => {
    const lend = lends.find(l => l.id === parseInt(req.params.id));
    if (lend) {
        res.json(lend)
    } else {
        res.send('Lend not found')
    }
})

app.post('/lends', (req, res) => {
    const {id, customer_id, isbn, borrowed_at, returned_at} = req.body;
    if (!id || !customer_id || !isbn || !borrowed_at) {
        return res.status(422).send('Input all fields (returned_at is optional)');
    }
    const activeLends = lends.filter(l => l.customer_id === customer_id && l.returned_at === null);
    if (activeLends.length >= 3) {
        return res.status(409).send('Customer has already three active lends');
    }
    const bookLent = lends.some(l => l.isbn === isbn && l.returned_at === null);
    if (bookLent) {
        return res.status(409).send('Book already lent');
    }
    const newLend = {
        id: lends.length + 1,
        customer_id, isbn,
        borrowed_at: new Date().toISOString(),
        returned_at: null
    };
    lends.push(newLend);
    res.json(newLend);
})



app.delete('/lends/:id', (req, res) => {
    const lendIndex = lends.findIndex(l => l.id === parseInt(req.params.id) && l.returned_at === null);
    if (lendIndex !== -1) {
        lends[lendIndex].returned_at = new Date().toISOString();
        res.send(lends[lendIndex]);
    } else {
        res.send('Lend does not exist or already returned')
    }
})





/* dies war einfach für mich
app.get('/now', (request, response) => {
    response.send(new Date().toLocaleTimeString("de-CH", {timeZone: request.query.tz}));
});
*/



app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});




