-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 04 Okt 2019 pada 16.18
-- Versi server: 10.4.6-MariaDB
-- Versi PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `print_online`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_wak_print` int(11) NOT NULL,
  `dokumen_pesanan` varchar(1000) NOT NULL,
  `jumlah_halaman_pesanan` int(11) NOT NULL,
  `jumlah_rangkap_pesanan` int(11) NOT NULL,
  `metode_print_pesanan` varchar(25) NOT NULL,
  `jenis_orientasi_halaman_pesanan` varchar(25) NOT NULL,
  `jenis_kertas_pesanan` varchar(25) NOT NULL,
  `total_harga_pesanan` int(255) NOT NULL,
  `metode_pengambilan_pesanan` varchar(25) NOT NULL,
  `metode_pembayaran_pesanan` varchar(25) NOT NULL,
  `status_pesanan` varchar(25) NOT NULL,
  `status_pembayaran_pesanan` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `email_user` varchar(50) NOT NULL,
  `password_user` varchar(1000) NOT NULL,
  `nama_lengkap_user` varchar(100) NOT NULL,
  `nomor_hp_user` varchar(15) DEFAULT NULL,
  `alamat_user` varchar(50) DEFAULT NULL,
  `foto_user` varchar(100) DEFAULT NULL,
  `saldo_user` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wak_print`
--

CREATE TABLE `wak_print` (
  `id_wak_print` int(11) NOT NULL,
  `email_wak_print` varchar(50) NOT NULL,
  `password_wak_print` varchar(1000) NOT NULL,
  `nama_wak_print` varchar(100) NOT NULL,
  `nomor_hp_wak_print` varchar(15) DEFAULT NULL,
  `alamat_wak_print` varchar(50) DEFAULT NULL,
  `detail_harga_wak_print` int(255) DEFAULT NULL,
  `foto_wak_print` varchar(100) DEFAULT NULL,
  `saldo` int(255) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `wak_print`
--
ALTER TABLE `wak_print`
  ADD PRIMARY KEY (`id_wak_print`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `wak_print`
--
ALTER TABLE `wak_print`
  MODIFY `id_wak_print` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
