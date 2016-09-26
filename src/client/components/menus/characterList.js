import React from 'react';

// eslint-disable-next-line no-unused-vars
import Styles from '../../../stylesheets/menus/characterList';

export default (props) => {
  const menu = props.menus.characterList;
  console.log('Character List', props);
  return (
    <div className='characterContainer'>
      <ul className='characterList'>
        <li>
          class <br />
          attune,<br />
          lvl
        </li>
        <li>
          class <br />
          attune,<br />
          lvl
        </li>
        <li>
          class <br />
          attune,<br />
          lvl
        </li>
        <li>
          class <br />
          attune,<br />
          lvl
        </li>
      </ul>
    </div>
  );
};