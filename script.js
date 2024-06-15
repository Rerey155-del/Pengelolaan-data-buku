const formTambahBuku = document.getElementById('form-tambah-buku');
const rakBelumSelesai = document.getElementById('rak-belum-selesai');
const rakSelesai = document.getElementById('rak-selesai');
const listBelumSelesai = document.getElementById('list-belum-selesai');
const listSelesai = document.getElementById('list-selesai');

let bukuData = localStorage.getItem('bukuData') ? JSON.parse(localStorage.getItem('bukuData')) : [];

formTambahBuku.addEventListener('submit', (e) => {
    e.preventDefault();
    const judul = document.getElementById('judul').value;
    const pengarang = document.getElementById('pengarang').value;
    const tahun = document.getElementById('tahun').value;
    const id = Date.now();
    const bukuBaru = {
        id,
        title: judul,
        author: pengarang,
        year: parseInt(tahun),
        isComplete: false
    };
    bukuData.push(bukuBaru);
    localStorage.setItem('bukuData', JSON.stringify(bukuData));
    renderBuku();
    formTambahBuku.reset();
});

function renderBuku() {
    listBelumSelesai.innerHTML = '';
    listSelesai.innerHTML = '';
    bukuData.forEach((buku) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${buku.title} - ${buku.author} (${buku.year})</span>
            <div>
                <button class="btn btn-sm btn-success me-2 toggle-status">${buku.isComplete ? 'Belum Selesai' : 'Selesai'}</button>
                <button class="btn btn-sm btn-danger delete-book">Hapus</button>
            </div>
        `;
        if (!buku.isComplete) {
            listBelumSelesai.appendChild(li);
        } else {
            listSelesai.appendChild(li);
        }

        li.querySelector('.toggle-status').addEventListener('click', () => {
            buku.isComplete = !buku.isComplete;
            localStorage.setItem('bukuData', JSON.stringify(bukuData));
            renderBuku();
        });

        li.querySelector('.delete-book').addEventListener('click', () => {
            const index = bukuData.indexOf(buku);
            bukuData.splice(index, 1);
            localStorage.setItem('bukuData', JSON.stringify(bukuData));
            renderBuku();
        });
    });
}

renderBuku();
