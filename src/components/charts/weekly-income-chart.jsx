"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function WeeklyIncomeChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const incomeData = [50, 15, 33, 10, 28, 35, 45, 27, 15, 70]

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            tension: 0.4,
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}
