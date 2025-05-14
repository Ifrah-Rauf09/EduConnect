document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:5000/tutors');
    const tutors = await response.json();

    const tutorsContainer = document.getElementById('tutors-container');
    tutors.forEach((tutor) => {
      const tutorCard = `
        <div class="tutor-card">
          <img src="${tutor.image}" alt="${tutor.name}">
          <h3>${tutor.name}</h3>
          <p>${tutor.subject}</p>
          <p>${tutor.rate}</p>
          <a href="tutor-profile.html?id=${tutor.id}" class="main-button">View Profile</a>
        </div>
      `;
      tutorsContainer.innerHTML += tutorCard;
    });
  } catch (error) {
    console.error('Error fetching tutors:', error);
  }
});