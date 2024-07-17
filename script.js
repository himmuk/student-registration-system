document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');  // Reference to the registration form
    const studentTableBody = document.querySelector('#studentTable tbody');       // Reference to the table body where student records will be displayed

    // Load students from local storage or initialize an empty array
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to add a student to the table
    function addStudentToTable(student) {
        const row = studentTableBody.insertRow();   // Create a new row in the table
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(this)">Edit</button>
                <button onclick="deleteStudent(this)">Delete</button>
            </td>
        `;
    } //row with student data and action buttons

    // Function to validate student details
    function validateStudent(student) {
        const nameRegex = /^[A-Za-z\s]+$/; // Regex for validating names (letters and spaces)
        const idRegex = /^\d+$/;           //Regex for validating IDs (digits only)
        const contactRegex = /^\d+$/;         // Regex for validating contact numbers (digits only)
        if (!nameRegex.test(student.name)) {
            alert('Student name should contain only characters.');       // Alert if name is invalid
            return false;
        }
        if (!idRegex.test(student.id)) {
            alert('Student ID should contain only numbers.');             // Alert if id is invalid
            return false;
        }
        if (!contactRegex.test(student.contact)) {
            alert('Contact number should contain only numbers.');         // Alert if contact mo is invalid
            return false;
        }
        return true;
    }

    //  form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const student = {
            name: form.studentName.value.trim(),   // Get and trim the student's name
            id: form.studentID.value.trim(),        // Get and trim the student's ID
            email: form.emailID.value.trim(),         // Get and trim the student's email
            contact: form.contactNo.value.trim()       // Get and trim the student's contact number
        };
        if (validateStudent(student)) {
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            addStudentToTable(student);
            form.reset();
        }
    });

    // Load students from local storage on page load
    students.forEach(addStudentToTable);

    //  functions to edit and delete students
    window.editStudent = function(button) {
        const row = button.parentNode.parentNode;                      // Get the row containing the button
        const cells = row.children;                     // Get the cells in the row
        form.studentName.value = cells[0].innerText;
        form.studentID.value = cells[1].innerText;
        form.emailID.value = cells[2].innerText;
        form.contactNo.value = cells[3].innerText;
        deleteStudent(button);  // Remove the student from the table and array
    };

    window.deleteStudent = function(button) {
        const row = button.parentNode.parentNode;
        const index = Array.from(studentTableBody.children).indexOf(row);
        students.splice(index, 1);                                      // Remove the student from the array
        localStorage.setItem('students', JSON.stringify(students)); // Save the updated array to local storage
        row.remove();                                           // Remove the row from the table
    };
});
