"use client";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { MoreVertical, Pen, TrashIcon } from "lucide-react";
import { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AddCategoryButton } from "@/components/dashboard/services/add-category-button";
import { AddServiceButton } from "@/components/dashboard/services/add-service-button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, deleteService, getServicesData } from "@/actions/actions";

export default function ServicePage() {
  return (<DashboardContentContainer>Calendar</DashboardContentContainer>)
}