document.addEventListener("DOMContentLoaded", () => {
    // Get Element
    let snippetForm = document.getElementById("snippet-form");
    let snippetsContainer = document.getElementById("snippets-container");
    let snippets = JSON.parse(localStorage.getItem("snippets")) || [];

    snippetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let language = document.getElementById("language").value;
    let code = document.getElementById("code").value;
    let description = document.getElementById("description").value;

    let newSnippet = { id: Date.now(), title, language, code, description };
    snippets.push(newSnippet);
    localStorage.setItem("snippets", JSON.stringify(snippets));
    renderSnippets();
    snippetForm.reset();
    });

    function renderSnippets() {
        function escapeHTML(str) {
            return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        snippetsContainer.innerHTML = snippets.map(snippet => `
            <div class="bg-gray-800 p-5 rounded-2xl flex flex-col gap-3 shadow-md">
                <div class="flex flex-col gap-1">
                    <h3 class="text-gray-100 text-xl font-bold">${snippet.title}</h3>
                    <p class="text-sky-400 text-sm">${snippet.language}</p>
                </div>
                
                <pre class="text-gray-100 text-sm font-mono bg-gray-700 p-3 rounded-lg overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 flex flex-col gap-2">${escapeHTML(snippet.code)}</pre>

                <p class="text-gray-300 text-sm leading-relaxed">${snippet.description || "No description provided."}</p>

                <div class="flex gap-3">
                    <button data-id="${snippet.id}" onClick="deleteSnippet(${snippet.id})"
                    class="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg transition">
                    <i class="fa-solid fa-trash-can"></i>
                    </button>

                    <button data-id="${snippet.id}" onClick="editSnippet(${snippet.id})"
                    class="delete-btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 py-1 rounded-lg transition">
                    <i class="fa-solid fa-pen"></i>
                    </button>
                </div>
            </div>
        `).join("");
    }

    // Delete Snippets
    window.deleteSnippet = id => {
        if(confirm("Are you sure?")) {
            snippets = snippets.filter(s => s.id !== id);
            localStorage.setItem("snippets", JSON.stringify(snippets));
            renderSnippets();
        }
    }

    // Edite Snippets
    window.editSnippet = id => {
        let snippet = snippets.find(s => s.id === id);
        document.getElementById("title").value = snippet.title;
        document.getElementById("language").value = snippet.language;
        document.getElementById("code").value = snippet.code;
        document.getElementById("description").value = snippet.description;

        snippets = snippets.filter(s => s.id !== id);
        renderSnippets(); 
    };

    renderSnippets();
});




