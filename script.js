async function postComment() {
    const token = 'YOUR_TOKEN'; // Ganti dengan token akses pribadi kamu
    const repoOwner = 'username'; // Ganti dengan nama pengguna GitHub kamu
    const repoName = 'repo'; // Ganti dengan nama repositori kamu

    // Mengambil nilai dari input form
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value; // Email opsional
    const commentBody = document.querySelector('textarea[name="comment"]').value;

    // Judul issue bisa diatur berdasarkan nama atau pesan
    const issueTitle = `${name} memberikan komentar`;

    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: issueTitle,
            body: commentBody,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Issue created:', data);
        // Panggil fetchComments di sini jika perlu mengambil komentar setelah membuat issue
        fetchComments(data.number); // Ambil komentar dari issue yang baru dibuat
    } else {
        console.error('Error creating issue:', response.statusText);
    }
}

// Panggil fungsi postComment saat form dikirim
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah pengiriman form standar
    postComment();
});

async function fetchComments(issueNumber) {
    const token = 'YOUR_TOKEN'; // Ganti dengan token akses pribadi kamu
    const repoOwner = 'username'; // Ganti dengan nama pengguna GitHub kamu
    const repoName = 'repo'; // Ganti dengan nama repositori kamu

    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/comments`, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    });

    if (response.ok) {
        const comments = await response.json();
        // Menampilkan komentar di website
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = ''; // Kosongkan kontainer sebelum menambahkan komentar baru
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `<strong>${comment.user.login}</strong>: ${comment.body}`;
            commentsContainer.appendChild(commentElement);
        });
    } else {
        console.error('Error fetching comments:', response.statusText);
    }
}