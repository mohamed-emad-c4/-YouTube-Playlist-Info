// content.js

function getVideoDetails() {
    const videos = document.querySelectorAll('ytd-playlist-video-renderer');
    let videoData = [];
  
    videos.forEach((video) => {
      const titleElement = video.querySelector('#video-title');
      const durationElement = video.querySelector('span.ytd-thumbnail-overlay-time-status-renderer');
      const videoTitle = titleElement ? titleElement.textContent.trim() : 'Unknown';
      const videoUrl = titleElement ? titleElement.href : 'Unknown';
      const videoDuration = durationElement ? durationElement.textContent.trim() : 'Unknown';
  
      videoData.push({
        title: videoTitle,
        url: videoUrl,
        duration: videoDuration
      });
    });
  
    return videoData;
  }
  
  // إرسال البيانات إلى الـ popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getVideoDetails") {
      const videoDetails = getVideoDetails();
      sendResponse({ videos: videoDetails });
    }
  });
  