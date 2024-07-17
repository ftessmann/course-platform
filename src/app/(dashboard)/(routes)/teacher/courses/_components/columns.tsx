"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";


import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

import { 
    ArrowUpDown, 
    MoreHorizontal, 
    Pencil,
    Trash, 
    
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price") || "0");
        const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(price);

        return (
            <div>
                {formattedPrice}
            </div>
        )
      }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const isPublished = row.getValue("isPublished") || false;

        return (
            <Badge
                className={cn(
                    'bg-slate-500',
                    isPublished && 'bg-sky-500'
                )}
            >
                {isPublished ? "Published" : "Draft"}
            </Badge>
        )
      }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const { id } = row.original;

        const [isLoading, setIsLoading] = useState(false);

        const router = useRouter();

        const onDelete = async () => {
            try {
                setIsLoading(true);
        
                await axios.delete(`/api/courses/${id}`);
        
                toast.success("Course Deleted");
                router.push(`/teacher/courses`)
            } catch {
                toast.error("Something went wrong.")
            } finally {
                setIsLoading(false);
            }
        }

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-4 w-8 p-0"
                    >
                        <span
                            className='sr-only'
                        >
                            Open menu
                        </span>
                        <MoreHorizontal 
                            className="h-5 w-5"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Button
                        variant='ghost'
                    >
                        <Link
                            href={`/teacher/courses/${id}`}
                        >
                            <DropdownMenuItem>
                                <Pencil 
                                    className="h-4 w-4 mr-2"
                                />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </Button>

                    <ConfirmModal
                        onConfirm={onDelete}
                    >
                        <Button
                            variant='ghost'
                            disabled={isLoading}
                        >
                            <DropdownMenuItem>
                                <Trash 
                                    className="h-4 w-4 mr-2"
                                />
                                Delete
                            </DropdownMenuItem>
                            
                        </Button>
                    </ConfirmModal>

                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  }
]
