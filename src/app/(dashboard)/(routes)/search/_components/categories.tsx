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
import { CategoryItem } from "./category-item";

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
        <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
            
            {items.map((item) => (
                <CategoryItem 
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
};