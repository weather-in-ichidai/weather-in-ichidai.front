import React, { useEffect, useState } from "react"
import Image from "next/image"
import Header from "../components/header"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import "highcharts/css/themes/dark-unica.css"
import ScrollHint from "scroll-hint"
import "scroll-hint/css/scroll-hint.css"
import useAspidaSWR from "@aspida/swr"
import aspida from "@aspida/fetch"
import api from "../../api/$api"
import HashLoader from "react-spinners/HashLoader"

enum WeatherImage {
  sunny = "weather-sunny",
  cloudy = "weather-cloudy",
  rainy = "weather-rain",
  snowy = "weather-snow",
  rainyOrSnowy = "weather-snow"
}

enum ClothImage {
  superCool = "t-shirt",
  cool = "shirt",
  common = "hooded",
  warm = "coat",
  superWarm = "down-jacket"
}

const Index: React.FC<null> = () => {
  const client = api(
    aspida(fetch, { baseURL: "https://0bb6752b-b9ec-437a-8efb-f853bd3511b7.mock.pstmn.io" })
  )
  const { data, error } = useAspidaSWR(client.weather, { query: { date: "2020-12-01" } })
  const [isReady, setIsReady] = useState<boolean>(false)
  const [options, setOptions] = useState<{}>()
  const [weatherImagePath, setWeatherImagePath] = useState<string>("")
  const [clothImagePath, setClothImagePath] = useState<string>("")

  const today = new Date()

  useEffect(() => {
    if (data !== undefined) {
      setIsReady(true)
      setWeatherImagePath(`/icon/${WeatherImage[data.weather]}.svg`)
      setClothImagePath(`/clothes/${ClothImage[data.clothing]}.svg`)

      setOptions({
        chart: {
          type: "line"
        },
        title: {
          text: "20日の気温"
        },
        // xAxis: {
        //   categories: [
        //   ]
        // },
        yAxis: {
          title: {
            text: "Temperature (°C)"
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        series: [
          {
            name: "Hiroshima",
            data: data.temperature
          }
        ]
      })
    }
  }, [data])

  useEffect(() => {
    if (isReady) {
      new ScrollHint(".js-scrollable", {
        suggestiveShadow: true,
        offset: 0,
        i18n: {
          scrollable: "スクロールできます"
        }
      })
    }
  }, [isReady])

  return (
    <>
      {isReady ? (
        <>
          <section className="bg-hero bg-cover font-sans pb-16">
            <Header />
            <div className="m-4 lg:container lg:mx-auto">
              <div className="bg-gray-700 bg-opacity-60 px-4 py-8">
                <div className="text-white">
                  {/* date */}
                  <div className="text-center font-bold mb-8">
                    <p className="text-l">{today.getFullYear()}</p>
                    <p className="text-2xl">{`${today.getMonth() + 1}/${today.getDate()}`}</p>
                  </div>

                  {/* heading */}
                  <div className="flex mb-8">
                    {/* weather icon */}
                    <div className="flex-1 text-center">
                      <Image src={weatherImagePath} width={80} height={80} />
                    </div>

                    {/* weather data */}
                    <div className="flex-1">
                      {/* probability of precipitation */}
                      <div className="flex justify-center mt-1 mb-4">
                        <div className="mr-2">
                          <Image src={"/icon/open-droplet.svg"} width={20} height={20} />
                        </div>
                        <div>
                          <p>{`${data.rainfallRate}%`}</p>
                        </div>
                      </div>

                      {/* temperature */}
                      <div className="text-center">
                        <p>{`+${data.maxTemp}℃ / - ${data.minTemp}℃`}</p>
                      </div>
                    </div>
                  </div>
                  {/* end heading */}

                  {/* clothes */}
                  <div className="text-center mb-8">
                    <Image src={clothImagePath} width={60} height={60} />
                  </div>

                  {/* description */}
                  <div className="px-8 mb-12">
                    <p>{data.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 text-white px-4 py-8">
            {/* heading */}
            <div className="flex justify-center mb-4">
              <div className="mr-2">
                <Image src="/icon/material-timeline.svg" width={40} height={40} />
              </div>
              <div className="text-2xl text-bold">
                <p>気温</p>
              </div>
            </div>

            {/* chart */}
            <div className="js-scrollable">
              <div className="w-2screen md:w-full">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>
          </section>

          <section className="bg-gray-900 text-white px-4 py-8 text-center">
            <div className="py-8">
              <div className="mb-4">
                <Image src="/icon/weather-badge.svg" width={50} height={50} />
              </div>
              <div className="text-2xl text-bold mb-4">
                <p>天気</p>
              </div>
              <div className="text-lg">
                <p>
                  気象庁のデータに基づいた
                  <br />
                  天気予報
                </p>
              </div>
            </div>

            <div className="py-8">
              <div className="mb-4">
                <Image src="/icon/rainy-badge.svg" width={50} height={50} />
              </div>
              <div className="text-2xl text-bold mb-4">
                <p>降水確率</p>
              </div>
              <div className="text-lg">
                <p>
                  広島市立大学に設置されたPOTEKA
                  <br />
                  によって収集されたデータに基づく
                  <br />
                  降水短時間予報
                </p>
              </div>
            </div>

            <div className="py-8">
              <div className="mb-4">
                <Image src="/icon/temperature-badge.svg" width={50} height={50} />
              </div>
              <div className="text-2xl text-bold mb-4">
                <p>気温</p>
              </div>
              <div className="text-lg">
                <p>
                  気象庁のデータに基づいた
                  <br />
                  気温予報
                </p>
              </div>
            </div>

            <div className="py-8">
              <div className="mb-4">
                <Image src="/icon/clothes-badge.svg" width={50} height={50} />
              </div>
              <div className="text-2xl text-bold mb-4">
                <p>服装</p>
              </div>
              <div className="text-lg">
                <p>
                  天気, 気温といったデータから
                  <br />
                  予測される最適な服装
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-tl from-purple-600 via-pink-600 to-red-600 text-white text-center px-4 py-8">
            <div className="mb-4">
              <p className="text-2xl font-bold">Weather in Ichidai</p>
              <p className="text-lg">Powered by POTEKA</p>
            </div>

            <div className="mb-4">
              <p>
                広島市立大学 大学院
                <br />
                情報科学研究科 知能工学専攻
                <br />
                データ工学研究室
              </p>
            </div>

            <a href="https://github.com/weather-in-ichidai">
              <Image src="/button/github.png" width={180} height={60} />
            </a>
          </section>

          <section className="bg-gray-800 text-white px-4 py-8">
            <p className="text-white text-xs text-center">
              © 2020 Weather in Ichidai. All Rights Reserved.
            </p>
          </section>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center bg-gray-800">
          <HashLoader color={"#ffffff"} loading={true} size={80} />
        </div>
      )}
    </>
  )
}

export default Index
