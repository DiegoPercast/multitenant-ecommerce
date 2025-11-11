import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'

import { customCategory } from "../types"

interface Props {
	open: boolean,
	onOpenChange: (open: boolean) => void
	categories: customCategory[]
}

export const CategoriesSidebar = ({ open, onOpenChange, categories }: Props) => {
	const router = useRouter()

	const [parentCategories, setParentCategories] = useState<customCategory[] | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<customCategory | null>(null)
	
	// if we have parent categories show those, otherwise use root categories
	const currentCategories = parentCategories ?? categories ?? []

	const handleOpenChange = (open: boolean) => {
		setSelectedCategory(null)
		setParentCategories(null)
		onOpenChange(open)
	}

	const handleCategoryClick = (category: customCategory) => {
		if (category.subcategories && category.subcategories.length > 0) {
			setParentCategories(category.subcategories as customCategory[])
			setSelectedCategory(category)
		} else {
			// This is a leaf category (no subcategories)
			if (parentCategories && selectedCategory) {
				// This is a subcategory - navigate to /category/subcategory
				router.push(`/${selectedCategory.slug}/${category.slug}`)
			} else {
				// This is a main category - navigate to /category
				if (category.slug === "all") {
					router.push("/")
				} else {
					router.push(`/${category.slug}`)
				}
			}
			handleOpenChange(false)
		}
	}

	const handleBackClick = () => {
		if (parentCategories) {
			setParentCategories(null)
			setSelectedCategory(null)
		}
	}

	const backgroundColor = selectedCategory?.color || "white"

	return (
		<Sheet open={open} onOpenChange={handleOpenChange} >
			<SheetContent
				side="left"
				className="p-0 transition-none"
				style={{ backgroundColor: backgroundColor }}
			>
				<SheetHeader className="p-4 border-b">
					<SheetTitle>
						Categories
					</SheetTitle>
				</SheetHeader>
				<ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
					{parentCategories && (
						<button 
							onClick={handleBackClick}
							className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
						>
							<ChevronLeft className="size-4 mr-2 " />
							Back
						</button>
					)}
					{currentCategories.map(category => (
						<button
							key={category.slug}
							onClick={() => handleCategoryClick(category)}
							className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between text-base font-medium cursor-pointer"
						>
							{category.name}
							{category.subcategories && category.subcategories.length > 0 && (
								<ChevronRight className="size-4" />
							)}
						</button>
					))}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}