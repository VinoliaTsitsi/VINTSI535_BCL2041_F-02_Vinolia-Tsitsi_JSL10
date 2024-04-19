document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            })
            .catch(error => {
                console.error('Error fetching the books:', error);
                document.getElementById("room1Result").textContent = 'Failed to load the books data.';  
            });
    });

    document.getElementById("solveRoom2Button").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async','promise']);
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    document.getElementById("solveRoom3Button").addEventListener("click", () => {
        fetch('directions.json') 
            .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)
                    .then(message => {
                        document.getElementById("room3Result").textContent = message;
                    });
            });
    });
});

function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent, { published: new Date(0) });
}

function findIntersection(setA, setB) {
    const intersection = new Set();
    for (const elem of setA) {
        if (setB.has(elem)) {
            intersection.add(elem); 
        }
    }
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Navigating: ${direction.step}`);
                resolve();
            }, 1000);
        }); 
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}


