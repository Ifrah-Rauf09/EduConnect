document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tutorId = urlParams.get('id');

  if (!tutorId) {
    alert('Tutor ID not found in the URL.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/tutors`);
    const tutors = await response.json();

    const tutor = tutors.find(t => t.id === tutorId);
    if (!tutor) {
      alert('Tutor not found.');
      return;
    }

    // Populate the profile page with tutor details
    document.getElementById('tutor-name').textContent = tutor.name;
    document.getElementById('tutor-img').src = tutor.image;
    document.getElementById('tutor-bio').textContent = tutor.bio;
    document.getElementById('tutor-subject').textContent = tutor.subject;
    document.getElementById('tutor-location').textContent = tutor.location;
    document.getElementById('tutor-rate').textContent = tutor.rate;

    // Populate education
    const educationList = document.getElementById('tutor-education');
    tutor.education.forEach(edu => {
      const li = document.createElement('li');
      li.textContent = `${edu.degree} - ${edu.university}`;
      educationList.appendChild(li);
    });

    // Populate reviews
    const reviewsList = document.getElementById('tutor-reviews');
    tutor.reviewsList.forEach(review => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${review.author}</strong> (${review.date}): ${review.comment}`;
      reviewsList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching tutor details:', error);
    alert('Failed to load tutor details. Please try again later.');
  }
});