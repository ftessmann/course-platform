'use client';

import { Category } from "@prisma/client";

import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSportsMode,
    FcBiotech,
    FcCalculator,
    FcCommandLine,
    FcCloth
} from "react-icons/fc"
import { IconType } from "react-icons/lib";

interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category['name'], IconType> = {
    "Music": FcMusic,
    "Engineering": FcEngineering,
    "Accounting": FcCalculator,
    "Biology": FcBiotech,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Computer Science": FcCommandLine,
    "Culinary": FcCloth,
    "Video": FcFilmReel,
    "Design": FcMultipleDevices
}

export const Categories = ({
    items
}: CategoriesProps ) => {
    return (
        <div>

        </div>
    )
};