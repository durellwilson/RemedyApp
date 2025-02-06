import React, { useState, useRef, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { 
  FaShareAlt, 
  FaFacebookF, 
  FaPinterestP, 
  FaEnvelope, 
  FaLink, 
  FaShareSquare, 
  FaExternalLinkAlt 
} from 'react-icons/fa';
import { MdSms } from 'react-icons/md';
import '../../styles/ShareButtons.css';


const ShareButtons = ({ url, title, description, imageUrl, containerClass = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fallback native share function if available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.error('Native share failed:', err);
      }
    } else {
      alert('Native share is not available in your browser.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`share-buttons-container ${containerClass}`} ref={dropdownRef}>
      <button type="button" className="share-icon" onClick={toggleDropdown}>
        <FaShareAlt size={20} />
      </button>
      {isOpen && (
        <div className="share-dropdown-overlay">
          <div className="share-dropdown">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="dropdown-btn"
              title="Share on Facebook"
            >
              <FaFacebookF size={20} color="#4267B2" />
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                url
              )}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="dropdown-btn"
              title="Share on Pinterest"
            >
              <FaPinterestP size={20} color="#E60023" />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                title
              )}&body=${encodeURIComponent(description + ' ' + url)}`}
              className="dropdown-btn"
              title="Share via Email"
            >
              <FaEnvelope size={20} color="#D44638" />
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="dropdown-btn"
              title="Copy Link"
            >
              <FaLink size={20} color="#333" />
            </button>
            <a
              href={`sms:?body=${encodeURIComponent(url)}`}
              className="dropdown-btn"
              title="Share via SMS"
            >
              <MdSms size={20} color="#34B7F1" />
            </a>
            <button
              type="button"
              onClick={handleNativeShare}
              className="dropdown-btn"
              title="Native Share"
            >
              <FaShareSquare size={20} color="#333" />
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="dropdown-btn"
              title="View Remedy Details"
            >
              <FaExternalLinkAlt size={20} color="#333" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons; 