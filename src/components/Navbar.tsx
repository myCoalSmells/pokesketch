import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

function Navbar() {
  const [mute, setMute] = useState<boolean>(() =>
    // Default to unmuted if localStorage item doesn't exist yet
    JSON.parse(localStorage.getItem('mute') || 'false'));

  useEffect(() => {
    // Whenever mute state changes, update localStorage item
    localStorage.setItem('mute', JSON.stringify(mute));
  }, [mute]);

  const toggleMute = () => {
    setMute((prevMute) => !prevMute);
  };

  return (
    <nav>
      <Link to="/">POKESKETCH</Link>
      {mute
        ? <VolumeMuteIcon onClick={toggleMute} />
        : <VolumeUpIcon onClick={toggleMute} />}
    </nav>
  );
}

export default Navbar;
