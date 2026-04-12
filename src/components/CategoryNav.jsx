// src/components/CategoryNav.jsx

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


// Fetch Categories
const fetchCategories = async () => {
        const response = await axios.get(
        'https://fakestoreapi.com/products/categories'
    )
    return response.data
}

const CategoryNav = ({ selectedCategory, setSelectedCategory }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    })



    if (isLoading) return <p>Loading categories...</p>

    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
            <option value=''>All Categories</option>

            {data?.map(category => (
                <option key={category} value={category}>{category}</option>
            ))}

        </select>
    )
}

export default CategoryNav;