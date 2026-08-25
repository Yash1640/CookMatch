import { useMemo, useState } from 'react'

const ingredientList = [
  'Egg',
  'Tomato',
  'Onion',
  'Cheese',
  'Bread',
  'Potato',
  'Rice',
  'Chicken',
  'Carrot',
  'Spinach',
]

const recipes = [
  {
    title: 'Omelette',
    description: 'Egg, tomato, onion and cheese.',
    ingredients: ['egg', 'tomato', 'onion', 'cheese'],
  },
  {
    title: 'Tomato Sandwich',
    description: 'Bread, tomato and cheese.',
    ingredients: ['bread', 'tomato', 'cheese'],
  },
  {
    title: 'Chicken Rice',
    description: 'Rice, chicken, onion and carrot.',
    ingredients: ['rice', 'chicken', 'onion', 'carrot'],
  },
  {
    title: 'Potato Egg',
    description: 'Potato, egg, onion and spinach.',
    ingredients: ['potato', 'egg', 'onion', 'spinach'],
  },
  {
    title: 'Vegetable Rice',
    description: 'Rice, tomato, onion, carrot and spinach.',
    ingredients: ['rice', 'tomato', 'onion', 'carrot', 'spinach'],
  },
]

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [matchedRecipeTitles, setMatchedRecipeTitles] = useState([])

  const selectedSet = useMemo(() => new Set(selectedIngredients), [selectedIngredients])

  const toggleIngredient = (ingredient) => {
    const key = ingredient.toLowerCase()

    setSelectedIngredients((previous) => {
      if (previous.includes(key)) {
        return previous.filter((item) => item !== key)
      }

      return [...previous, key]
    })
  }

  const findRecipes = () => {
    const matches = recipes
      .filter((recipe) => recipe.ingredients.every((item) => selectedSet.has(item)))
      .map((recipe) => recipe.title)

    setMatchedRecipeTitles(matches)
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">CookMatch</h1>

          <div className="flex gap-6 font-medium text-sm">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Share Recipes
            </a>
            <a href="#" className="text-orange-500 hover:text-orange-600">
              Login
            </a>
          </div>
        </div>
      </nav>

      <section className="text-center py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900">What can you cook?</h2>

        <p className="mt-4 text-lg text-gray-700">
          Find recipes using the ingredients you already have.
        </p>

        <button
          type="button"
          onClick={findRecipes}
          className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full cursor-pointer"
        >
          Find Recipes
        </button>

        <p className="mt-4 font-medium text-orange-600">
          {selectedIngredients.length} ingredient(s) selected.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Ingredients</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {ingredientList.map((ingredient) => {
              const selected = selectedSet.has(ingredient.toLowerCase())

              return (
                <button
                  key={ingredient}
                  type="button"
                  onClick={() => toggleIngredient(ingredient)}
                  className={`ingredient p-3.5 text-center border rounded-lg font-medium cursor-pointer ${
                    selected ? 'selected' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p>{ingredient}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipes You Can Make</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {recipes.map((recipe) => {
            const isMatch = matchedRecipeTitles.includes(recipe.title)

            return (
              <div
                key={recipe.title}
                className={`recipe p-6 bg-white rounded-xl border border-gray-200 flex flex-col justify-between ${
                  isMatch ? 'match' : ''
                }`}
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{recipe.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{recipe.description}</p>
                </div>
                <button
                  type="button"
                  className="mt-6 text-orange-500 hover:text-orange-600 font-semibold text-sm self-start cursor-pointer"
                >
                  View Recipe &rarr;
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-orange-500">CookMatch</h3>
              <p className="mt-2 text-sm text-gray-600">
                Find recipes using the ingredients you already have.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Home</a></li>
                <li><a href="#" className="hover:text-orange-500">Recipes</a></li>
                <li><a href="#" className="hover:text-orange-500">Share Recipe</a></li>
                <li><a href="#" className="hover:text-orange-500">About</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Follow Us</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li><a href="#" className="hover:text-orange-500">Instagram</a></li>
                <li><a href="#" className="hover:text-orange-500">Facebook</a></li>
                <li><a href="#" className="hover:text-orange-500">YouTube</a></li>
                <li><a href="#" className="hover:text-orange-500">X (Twitter)</a></li>
              </ul>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <p className="text-center text-sm text-gray-500">
            Copyright 2026 CookMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
