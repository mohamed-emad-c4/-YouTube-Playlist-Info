document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getVideoDetails" }, (response) => {
        if (response && response.videos) {
          const videoList = document.getElementById('videoList');
          const totalVideosElement = document.getElementById('totalVideos');
          const totalDurationElement = document.getElementById('totalDuration');
          let totalDuration = 0; // لحساب المدة الكلية
  
          response.videos.forEach((video) => {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'video';
  
            const titleLink = document.createElement('a');
            titleLink.href = video.url;
            titleLink.textContent = video.title;
            titleLink.className = 'video-title';
            titleLink.target = '_blank';
  
            const durationSpan = document.createElement('span');
            durationSpan.textContent = ` (${video.duration})`;
            durationSpan.className = 'video-duration';
  
            videoDiv.appendChild(titleLink);
            videoDiv.appendChild(durationSpan);
            videoList.appendChild(videoDiv);
  
            // تحويل مدة الفيديو من صيغة "mm:ss" إلى ثواني
            const timeParts = video.duration.split(':').map(Number);
            const durationInSeconds = timeParts.length === 2
              ? timeParts[0] * 60 + timeParts[1] // mm:ss
              : timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]; // hh:mm:ss
            
            totalDuration += durationInSeconds;
          });
  
          // حساب العدد الكلي للفيديوهات
          totalVideosElement.textContent = `Total Videos: ${response.videos.length}`;
  
          // حساب المدة الإجمالية وتحويلها إلى ساعات ودقائق
          const hours = Math.floor(totalDuration / 3600);
          const minutes = Math.floor((totalDuration % 3600) / 60);
          totalDurationElement.textContent = `Total Duration: ${hours}h ${minutes}m`;
        }
      });
    });
  });
  