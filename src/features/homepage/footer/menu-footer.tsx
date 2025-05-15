import { Link } from 'react-router'

interface ISubItem {
    url: string
    title: string
    isExternal: boolean
}

interface IData {
    title: string
    data: ISubItem[]
}
const data: IData[] = [
    {
        title: 'Menu Kami',
        data: [
            { isExternal: false, url: '/', title: 'Beranda' },
            {
                isExternal: false,
                url: '/profil',
                title: 'Profil',
            },
            {
                isExternal: false,
                url: '/instansi',
                title: 'Instansi',
            },
            {
                isExternal: true,
                url: '/PANDUAN_MPP_1.0.1.pdf',
                title: 'Panduan',
            },
        ],
    },
    {
        title: 'Sosial',
        data: [
            { isExternal: true, url: 'https://', title: 'Facebook' },
            { isExternal: true, url: 'https://', title: 'Instagram' },
            { isExternal: true, url: 'https://', title: 'Tiktok' },
        ],
    },
    {
        title: 'Sistem Terkait',
        data: [
            {
                isExternal: true,
                url: 'https://lapor.go.id',
                title: 'SP4N Lapor',
            },
            { isExternal: true, url: 'https://oss.go.id', title: 'OSS RBA' },
            {
                isExternal: true,
                url: 'https://sicantik.go.id',
                title: 'Si Cantik',
            },
            { isExternal: true, url: 'https://simbg.pu.go.id', title: 'SIMBG' },
            {
                isExternal: true,
                url: 'https://dpmptsp.pangkalpinangkota.go.id',
                title: 'Website DPMPTSP',
            },
        ],
    },
]

const MenuFooter = () => {
    return (
        <div className="px-4 mt-12 md:flex md:flex-row md:justify-evenly lg:justify-between md:gap-14">
            {data.map((item) => (
                <MenuList key={item.title} item={item} />
            ))}
        </div>
    )
}
export default MenuFooter

export const MenuList = ({ item }: { item: IData }) => {
    return (
        <div className="mb-8 mx-2 md:mx-0">
            <h4 className="text-lg mb-3 font-bold">{item?.title ?? ''}</h4>
            <ul className="flex flex-col gap-3 text-sm">
                {item?.data?.length
                    ? item?.data?.map((subitem) => (
                          <li key={subitem?.title}>
                              {subitem.isExternal ? (
                                  <a
                                      target="_blank"
                                      href={subitem?.url}
                                      className="font-light"
                                  >
                                      {subitem.title ?? ''}
                                  </a>
                              ) : (
                                  <Link
                                      to={subitem?.url}
                                      className="font-light"
                                  >
                                      {subitem.title ?? ''}
                                  </Link>
                              )}
                          </li>
                      ))
                    : null}
            </ul>
        </div>
    )
}
