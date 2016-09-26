import React from 'react';

// eslint-disable-next-line no-unused-vars
import Styles from '../../../stylesheets/menus/characterList';

export default (props) => {
  const characters = props.characters;
  let slots = 3 - props.characters.length;
  for (slots = slots; slots >= 0; slots--) {
    characters.push({});
  }
  return (
    <div className='characterContainer'>
      <ul className='characterList'>
        {props.characters.map((character, index) => {
          return (
            <li key={character.name || index}>
              <div className='characterSummary'>
                <div className='classType'>{character.classType || 'Empty Slot'}</div>
                <div className='charData'>
                  <span className='attunement'>{character.attunement}</span>
                  <span className='level'>{character.level}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};