import React, { useEffect } from "react"
import Image from "next/image"
import Header from "../components/header"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import "highcharts/css/themes/dark-unica.css"
import ScrollHint from "scroll-hint"
import "scroll-hint/css/scroll-hint.css"

const Index: React.FC<null> = () => {
  const options = {
    chart: {
      type: "line"
    },
    title: {
      text: "Monthly Average Temperature"
    },
    subtitle: {
      text: "Source: WorldClimate.com"
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    },
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
        name: "Tokyo",
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
        name: "London",
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }
    ]
  }

  useEffect(() => {
    new ScrollHint(".js-scrollable", {
      suggestiveShadow: true,
      offset: 0
    })
  }, [])

  return (
    <>
      <section className="bg-hero bg-cover font-sans pb-16">
        <Header />
        <div className="m-4 lg:container lg:mx-auto">
          <div className="bg-gray-700 bg-opacity-60 px-4 py-8">
            <div className="text-white">
              {/* date */}
              <div className="text-center text-xl font-bold mb-8">
                <p>12/01</p>
              </div>

              {/* heading */}
              <div className="flex mb-8">
                {/* weather icon */}
                <div className="flex-1 text-center">
                  <Image src={"/icon/weather-day-sunny-overcast.svg"} width={80} height={80} />
                </div>

                {/* weather data */}
                <div className="flex-1">
                  {/* probability of precipitation */}
                  <div className="flex justify-center mt-1 mb-4">
                    <div className="mr-2">
                      <Image src={"/icon/open-droplet.svg"} width={20} height={20} />
                    </div>
                    <div>
                      <p>20%</p>
                    </div>
                  </div>

                  {/* temperature */}
                  <div className="text-center">
                    <p>+24℃ / - 18℃</p>
                  </div>
                </div>
              </div>
              {/* end heading */}

              {/* clothes */}
              <div className="text-center mb-8">
                <Image src="/clothes/default-shirt.svg" width={60} height={60} />
              </div>

              {/* description */}
              <div className="px-8 mb-12">
                <p>
                  東京などの太平洋側は乾燥した晴天が続きます。火の用心と風邪の予防を心がけましょう。お昼から夜にかけての気温です。全国的に1月らしい寒さが続くでしょう。東京の最高気温は11度、名古屋は8度です。
                </p>
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
  )
}

export default Index
