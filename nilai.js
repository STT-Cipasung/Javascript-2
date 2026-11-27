function hitungNilaiAkhir(tugas, uts, uas) {
  return (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);
}

function tentukanGrade(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 60) return "C";
  if (nilai >= 50) return "D";
  return "E";
}

function buatRekap(daftar) {
  return daftar.map(function(m) {
    var nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);
    var grade = tentukanGrade(nilaiAkhir);
    return {
      nim: m.nim,
      nama: m.nama,
      tugas: m.tugas,
      uts: m.uts,
      uas: m.uas,
      nilaiAkhir: Math.round(nilaiAkhir * 100) / 100,
      grade: grade,
      status: nilaiAkhir >= 60 ? "Lulus" : "Tidak Lulus"
    };
  });
}

function hitungRataRata(rekap) {
  if (rekap.length === 0) return 0;
  var total = rekap.reduce(function(sum, m) { return sum + m.nilaiAkhir; }, 0);
  return total / rekap.length;
}

function cariTertinggi(rekap) {
  if (rekap.length === 0) return null;
  return rekap.reduce(function(max, m) { return m.nilaiAkhir > max.nilaiAkhir ? m : max; });
}

function hitungDistribusiGrade(rekap) {
  var hasil = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  rekap.forEach(function(m) { hasil[m.grade]++; });
  return hasil;
}

function cariMahasiswa(rekap, keyword) {
  if (!keyword) return rekap;
  var k = keyword.toLowerCase();
  return rekap.filter(function(m) {
    return m.nama.toLowerCase().includes(k) || m.nim.toLowerCase().includes(k);
  });
}

function urutkanMahasiswa(rekap, kriteria) {
  var salinan = rekap.slice();
  if (kriteria === "nama") salinan.sort(function(a, b) { return a.nama.localeCompare(b.nama); });
  if (kriteria === "nilai") salinan.sort(function(a, b) { return b.nilaiAkhir - a.nilaiAkhir; });
  return salinan;
}

function validasiMahasiswa(nim, nama, tugas, uts, uas) {
  if (!nim || !nama) return "NIM dan Nama wajib diisi!";
  if (tugas < 0 || tugas > 100 || uts < 0 || uts > 100 || uas < 0 || uas > 100) return "Nilai harus 0-100!";
  return null;
}