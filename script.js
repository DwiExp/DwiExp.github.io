async function postComment() {
    const token = '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'; // Ganti dengan token akses pribadi kamu
    const repoOwner = 'DwiExp'; // Ganti dengan nama pengguna GitHub kamu
    const repoName = 'comment-section'; // Ganti dengan nama repositori kamu

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value; // Email opsional
    const commentBody = document.querySelector('textarea[name="comment"]').value;

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
        fetchComments(data.number); // Ambil komentar dari issue yang baru dibuat
    } else {
        console.error('Error creating issue:', response.statusText);
    }
}

async function fetchComments(issueNumber) {
    const token = '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'; // Ganti dengan token akses pribadi kamu
    const repoOwner = 'DwiExp'; // Ganti dengan nama pengguna GitHub kamu
    const repoName = 'comment-section'; // Ganti dengan nama repositori kamu

    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/comments`, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    });

    if (response.ok) {
        const comments = await response.json();
        console.log('Fetched comments:', comments); // Log untuk melihat komentar yang diambil
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

// Panggil fungsi postComment saat form dikirim
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah pengiriman form standar
    postComment();
});
