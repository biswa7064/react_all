const getTranslation = async (
  lang: string | string[]
): Promise<Record<string, any>> => {
  return import(`../../../../public/locales/${lang}/common.json`)
    .then((module) => module.default)
    .catch(() => {
      return import(`../../../../public/locales/en/common.json`).then(
        (module) => module.default
      )
    })
}
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = await getTranslation(lang)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          {t.header.title}
        </h1>
        <p className="text-gray-600 mb-4">{t.header.subtitle}</p>
        <div className="flex gap-4 mb-4">
          <button className="MuiButton-root bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">
            {t.buttons.login}
          </button>
          <button className="MuiButton-root bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition">
            {t.buttons.signup}
          </button>
        </div>
        <ul className="w-full flex">
          {t.demo.items.map((item: string) => (
            <li
              key={item}
              className="py-2 text-gray-800 flex-1 mx-[.5em] text-center border border-lime-500"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
