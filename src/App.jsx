
import { useState } from 'react';
import './App.css';

const App = () => {

  // Create a new state variable named team and set the initial state to an empty array []
  const [team, setTeam] = useState([]);

  // Create a new state variable named money and set the initial state to 100
  const [money, setMoney] = useState(100);

  // Create a new state variable to display a message in the browser when there isn’t enough budget to add a team member
  const [budgetMessage, setBudgetMessage] = useState('');

  // Create a new state variable named zombieFighters and set the initial state to an array of objects
  const [zombieFighters, setZombieFighters] = useState(
    [
      {
        id: 1,
        name: 'Survivor',
        price: 12,
        strength: 6,
        agility: 4,
        img: 'src/assets/images/survivor.png',
      },
      {
        id: 2,
        name: 'Scavenger',
        price: 10,
        strength: 5,
        agility: 5,
        img: 'src/assets/images/scavenger.png',
      },
      {
        id: 3,
        name: 'Shadow',
        price: 18,
        strength: 7,
        agility: 8,
        img: 'src/assets/images/shadow.png',
      },
      {
        id: 4,
        name: 'Tracker',
        price: 14,
        strength: 7,
        agility: 6,
        img: 'src/assets/images/tracker.png',
      },
      {
        id: 5,
        name: 'Sharpshooter',
        price: 20,
        strength: 6,
        agility: 8,
        img: 'src/assets/images/sharpshooter.png',
      },
      {
        id: 6,
        name: 'Medic',
        price: 15,
        strength: 5,
        agility: 7,
        img: 'src/assets/images/medic.png',
      },
      {
        id: 7,
        name: 'Engineer',
        price: 16,
        strength: 6,
        agility: 5,
        img: 'src/assets/images/engineer.png',
      },
      {
        id: 8,
        name: 'Brawler',
        price: 11,
        strength: 8,
        agility: 3,
        img: 'src/assets/images/brawler.png',
      },
      {
        id: 9,
        name: 'Infiltrator',
        price: 17,
        strength: 5,
        agility: 9,
        img: 'src/assets/images/infiltrator.png',
      },
      {
        id: 10,
        name: 'Leader',
        price: 22,
        strength: 7,
        agility: 6,
        img: 'src/assets/images/leader.png',
      },
    ]
  );

  // Calculate the total strength and agility for your team using the reduce() method
  const totalStrength = team.reduce((sum, zombieFighter) => sum + zombieFighter.strength, 0);
  const totalAgility = team.reduce((sum, zombieFighter) => sum + zombieFighter.agility, 0);


  // Create a function to filter out fighters based on the fighter id
  const filterbyId = (array, fighterId) => {
    return array.filter((fighter) => fighter.id !== fighterId);
  }

  // Create a function to be triggered when you click the Add button for any character in the zombieFighters list
  const handleAddFighter = (fighter) => {
    // If there's not enough money to add a fighter, log a message to the console and exit the function
    if (money < fighter.price) {
      setBudgetMessage("Not enough money to add a Zombie Fighter to your team!");  // Set additional message to display in the browser
      console.log("Not enough money!");
      return;
    }
    // Clear message if successful
    setBudgetMessage(''); 
    // Add the selected character’s object to the existing team state array 
    setTeam([...team, fighter]);
    // Remove the character from the zombieFighters state so they can’t be added again
    // Do that by filtering out the selected fighter id
    setZombieFighters(filterbyId(zombieFighters, fighter.id));
    // Upon adding a character to your team, subtract the character’s price from your current money value
    setMoney(money - fighter.price);
  };

  // Create a function to be triggered when you click the Remove button for any character in your team
  const handleRemoveFighter = (fighter) => {
    // Send back the selected character’s object to the existing ZombieFighter state array 
    setZombieFighters([...zombieFighters, fighter]);
    // Remove the character from the team state so they can’t be removed again
    // Do that by filtering out the selected fighter id
    setTeam(filterbyId(team, fighter.id));
    // Upon removing a character to your team, add the character’s price back to your current money value
    setMoney(money + fighter.price);
    // Clear alert message, if any
    setBudgetMessage('');
  }

  return (
    <>
      <h1>Zombie Fighters</h1>
      <h2>Money: ${money}</h2>
      {budgetMessage && <p className="alert">{budgetMessage}</p>}
      <h2>Team Strength: {totalStrength}</h2>
      <h2>Team Agility: {totalAgility}</h2>
      <h2>Team</h2>
      {team.length === 0 ? <p>Pick some team members!</p> :
        <ul>
          {team.map((teamFighter) => (
            <li key={teamFighter.id}>
              <img src={teamFighter.img} alt={teamFighter.name} />
              <p><strong>{teamFighter.name}</strong></p>
              <p>Price: ${teamFighter.price}</p>
              <p>Strength: {teamFighter.strength}</p>
              <p>Agility: {teamFighter.agility}</p>
              <button onClick={() => { handleRemoveFighter(teamFighter) }}>Remove</button>
            </li>
          ))}
        </ul>
      }
      <h2>Fighters</h2>
      <ul>
        {zombieFighters.map((zombieFighter) => (
          <li key={zombieFighter.id}>
            <img src={zombieFighter.img} alt={zombieFighter.name} />
            <p><strong>{zombieFighter.name}</strong></p>
            <p>Price: ${zombieFighter.price}</p>
            <p>Strength: {zombieFighter.strength}</p>
            <p>Agility: {zombieFighter.agility}</p>
            <button onClick={() => handleAddFighter(zombieFighter)}>Add</button>
          </li>
        ))}
      </ul>
    </>
  );
}


export default App;
