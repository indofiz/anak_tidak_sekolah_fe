export const baseUrl = 'https://ats.production.pangkalpinangkota.go.id/v1/'

export const requestOTP = baseUrl + 'otp/request'
export const validateOTP = baseUrl + 'otp/validate'
export const logout = baseUrl + 'otp/logout'
export const checkToken = baseUrl + 'otp/check-token'

// PSM URL

export const detailLengkapAnak = baseUrl + 'anak/detail-all'
export const cekNikAnak = baseUrl + 'anak/check'
export const listAnak = baseUrl + 'anak/list'

export const saveAnak = baseUrl + 'anak/save'

export const detailAnak = baseUrl + 'anak/detail'
export const updateAnak = baseUrl + 'anak/update'

export const detailSekolah = baseUrl + 'sekolah/detail'
export const updateSekolah = baseUrl + 'sekolah/update'

export const detailWali = baseUrl + 'wali/detail'
export const updateWali = baseUrl + 'wali/update'

export const detailTindakLanjut = baseUrl + 'tindak-lanjut/detail'
export const updateTindakLanjut = baseUrl + 'tindak-lanjut/update'

// MASTER DATA
export const listKategori = baseUrl + 'kategori/list'
export const listSubKategori = baseUrl + 'sub-kategori/list'
export const listPekerjaan = baseUrl + 'pekerjaan/list'
export const listAlasan = baseUrl + 'alasan/list'

// DASHBOARD
export const totalKecamatan = baseUrl + 'dashboard/total-kecamatan'
export const totalKelurahan = baseUrl + 'dashboard/total-kelurahan'
