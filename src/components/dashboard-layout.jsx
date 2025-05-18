"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ChevronRight,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Banknote,
  Maximize2,
  PillBottle,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MonthlyIssuanceChart } from "@/components/charts/monthly-issuance-chart";
import { WeeklyIncomeChart } from "@/components/charts/weekly-income-chart";
import { CardStatusChart } from "@/components/charts/card-status-chart";
import { MdCreditScore } from "react-icons/md";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlineAddCard } from "react-icons/md";

export function DashboardContent({ username }) {
  const [currentDate] = useState(new Date());
  const formattedDate = format(currentDate, "dd/MM/yyyy");
  const formattedTime = format(currentDate, "HH:mm:ss");
  const displayDate = format(currentDate, "dd MMM yyyy");

  // Mock data for recent card requests
  const recentRequests = [
    { branch: "Corporate", type: "Instant", quantity: 10, status: "Ready" },
    {
      branch: "Corporate",
      type: "Personalized",
      quantity: 10,
      status: "In Progress",
    },
    {
      branch: "Corporate",
      type: "Personalized",
      quantity: 10,
      status: "Acknowledged",
    },
    { branch: "Corporate", type: "Instant", quantity: 10, status: "Pending" },
  ];

  return (
    <main className="flex-1 overflow-auto p-4 bg-cardbg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="lg:text-2xl text-md font-semibold">
            Hi {username || "Nazeer"}, what would you like to do today?
          </h1>
          <p className="text-gray-500 text-sm">
            Last login: {formattedDate} {formattedTime}
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-2 rounded-lg border">
          <Calendar className="h-4 w-4" />
          <span>Today</span>
          <span className="text-gray-500">{displayDate}</span>
        </div>
      </div>

      <div className="mb-5 bg-dashboardWhite border pt-6 py-3 px-3 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Your Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-16 justify-start bg-cardbg hover:bg-hover"
          >
            <div className="bg-button p-2 rounded-full mr-3">
              <MdCreditScore className="h-5 w-5 text-white" />
            </div>
            <span>Manage a Card</span>
            <ChevronRight className="h-5 w-5 text-textcolor" />
          </Button>
          <Button
            variant="outline"
            className="h-16 justify-start bg-cardbg hover:bg-hover"
          >
            <div className="bg-button p-2 rounded-full mr-3">
              <BsCreditCard className="h-5 w-5 text-white" />
            </div>
            <span>Issue Instant Card</span>
            <ChevronRight className="h-5 w-5 text-textcolor" />
          </Button>
          <Button
            variant="outline"
            className="h-16 justify-start bg-cardbg hover:bg-hover"
          >
            <div className="bg-button p-2 rounded-full mr-3">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <span>Issue Personalized Card</span>
            <ChevronRight className="h-5 w-5 text-textcolor" />
          </Button>
          <Button
            variant="outline"
            className="h-16 justify-start bg-cardbg hover:bg-hover"
          >
            <div className="bg-button p-2 rounded-full mr-3">
              <MdOutlineAddCard className="h-5 w-5 text-white" />
            </div>
            <span>Review Card Requests</span>
            <ChevronRight className="h-5 w-5 text-textcolor" />
          </Button>
        </div>
      </div>

      <div className="relative  mb-4 ml-3">
        <h2 className="relative z-10 inline-block text-lg font-bold">
          Analytics
        </h2>
        <div className="absolute left-20 top-1/2 h-[2px] w-60 lg:w-240 bg-colorText -z-0"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0000008F] flex flex-col items-start">
              <MdOutlineAddCard className="h-5 w-5 text-[#00984C] mb-2" />
              Total Active Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold">26,478</div>
              <div className="flex">
                <div className="flex text-[#29A174] bg-[#EFFAF6] text-sm p-2 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +9%
                </div>
                <div className=" text-[#0000008F] text-nowrap mt-2">
                  this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0000008F] flex flex-col items-start">
              <BsCreditCard className="h-5 w-5 text-[#8020E7] mb-2" />
              Total Personalized Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold">15,703</div>
              <div className="flex">
                <div className="flex text-[#29A174] bg-[#EFFAF6] text-sm p-2 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  8.5%
                </div>
                <div className=" text-[#0000008F] text-nowrap mt-2">
                  this month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0000008F] flex flex-col items-start">
              <Banknote className="h-5 w-5 text-[#2087E7] mb-2" />
              Today's Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold">₦9.3M</div>
              <div className="flex">
                <div className="flex text-[#29A174] bg-[#EFFAF6] text-sm p-2 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +6%
                </div>
                <div className=" text-[#0000008F] text-nowrap mt-2">
                  vs yesterday
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#0000008F] flex flex-col items-start">
              <PillBottle className="h-5 w-5 text-[#E78020] mb-2" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">38</div>
              <div className="flex items-center text-[#E78020] text-sm">
                <CircleAlert className="h-5 w-5 mr-2" />
                <span>Requires attention</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Monthly Issuance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyIssuanceChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Recent Card Requests
            </CardTitle>
            <Button variant="ghost" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-[#F1F7FF]">Branch</TableHead>
                  <TableHead className="bg-[#F1F7FF]">Card Type</TableHead>
                  <TableHead className="bg-[#F1F7FF]">Quantity</TableHead>
                  <TableHead className="bg-[#F1F7FF]">Status</TableHead>
                  <TableHead className="bg-[#F1F7FF]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRequests.map((request, index) => (
                  <TableRow key={index}>
                    <TableCell>{request.branch}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          request.status === "Ready"
                            ? "bg-green-100 text-green-800 border-green-200 rounded-full"
                            : request.status === "In Progress"
                            ? "bg-orange-100 text-orange-800 border-orange-200 rounded-full"
                            : request.status === "Acknowledged"
                            ? "bg-blue-100 text-blue-800 border-blue-200 rounded-full"
                            : "bg-gray-100 text-gray-800 border-gray-200 rounded-full"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="link" className="text-button p-0 h-auto">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              This Week's Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyIncomeChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Card Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CardStatusChart />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
