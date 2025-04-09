
import React from "react";
import { AdminOverview } from "./AdminOverview";
import { AdminProperties } from "./AdminProperties";

export function AdminDashboard() {
  return (
    <div className="container mx-auto py-8">
      <AdminOverview />
      <div className="mt-8">
        <AdminProperties />
      </div>
    </div>
  );
}
