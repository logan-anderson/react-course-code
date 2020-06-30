import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import useDropDown from './useDropdown';
import Results from './Results';
import ThemeContext from './ThemeContext';
const SearchParams = () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([]);

  const [animal, AnimalDropDown] = useDropDown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropDown, setBreed] = useDropDown('Breed', '', breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });
    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');
    pet.breeds(animal).then(({ breeds }) => {
      const breadStrings = breeds.map(({ name }) => name);
      setBreeds(breadStrings);
    });
  }, [animal, setBreeds, setBreed]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>
        <AnimalDropDown />
        <BreedDropDown />
        <label htmlFor="theme">
          Theme
          <select onChange={e => setTheme(e.target.value)}>
            <option selected={theme === 'peru'} value="peru">
              Peru
            </option>
            <option selected={theme === 'darkblue'} value="darkblue">
              Dark Blue
            </option>
            <option selected={theme === 'green'} value="green">
              Green
            </option>
            <option selected={theme === 'red'} value="red">
              Red{' '}
            </option>
          </select>
        </label>
        <button
          style={{
            backgroundColor: theme
          }}
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
