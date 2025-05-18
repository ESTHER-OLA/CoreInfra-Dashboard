"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function MonthlyIssuanceChart() {
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
    const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]
    const personalizedData = [45, 70, 30, 60, 55, 80, 78]
    const instantData = [45, 70, 25, 100, 60, 50, 80]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            label: "Personalized",
            data: personalizedData,
            backgroundColor: "#1e40af",
            barPercentage: 0.6,
            categoryPercentage: 0.7,
          },
          {
            label: "Instant",
            data: instantData,
            backgroundColor: "#93c5fd",
            barPercentage: 0.6,
            categoryPercentage: 0.7,
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
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
            },
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
