'use client'
import SideBar from "@/components/dashboard/sidebar/Sidebar";
import { store } from "@/redux/dashboardstore";
import { Provider } from "react-redux";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Provider store={store}>
      <div className="flex flex-1 flex-row min-h-0">
        <SideBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      </Provider>
    </div>
  );
}
