// Roles: student, teacher
// Disciplines: Computer Science, Mathematics, Physics, Biology, Chemistry
// Academic status: active, academic leave, graduated, expelled


enum Role {
    Student = "student",
    Teacher = "teacher"
}

enum Discipline {
    ComputerScience = "Computer Science",
    Mathematics = "Mathematics",
    Physics = "Physics",
    Biology = "Biology",
    Chemistry = "Chemistry"
}

enum AcademicStatus {
    Active = "active",
    AcademicLeave = "academic leave",
    Graduated = "graduated",
    Expelled = "expelled"
}

enum Gender {
    Male = "male",
    Female = "female",
}

class UniversityError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UniversityError";
    }
}

class University {
    name: string;
    courses: Course[] = [];
    groups: Group[] = [];
    people: Person[] = [];

    constructor(name:string) {
        this.name = name;
    }

    addCourse(course: Course): void {
        this.courses.push(course);
    }

    addGroup(group: Group): void {
        this.groups.push(group);
    }

    addPerson(person: Person): void {
        this.people.push(person);
    }

    findGroupByCourse(course: Course): Group | undefined {
        return this.groups.find((group: Group) => group.course === course);
    }

    getAllPeopleByRole(role: Role): Person[] {
        switch (role) {
            case Role.Student:
                return this.people.filter((person) => person.role === Role.Student);
            case Role.Teacher:
                return this.people.filter((person) => person.role === Role.Teacher);
            default:
                return this.assertNeverRole(role);
        }
    }

    assertNeverRole(role: never): never {
        throw new Error(`Unhandled role: ${role}`);
    }
}

class Course {
    name: string;
    credits: number;
    discipline: Discipline;

    constructor(name: string, discipline: Discipline, credits: number) {
        this.name = name;
        this.credits = credits;
        this.discipline = discipline;
    }
}

class Group {
    name: string;
    course: Course;
    teacher: Teacher;
    students: Student[] = [];

    constructor(name: string, course: Course, teacher: Teacher) {
        this.name = name;
        this.course = course;
        this.teacher = teacher;
    }

    addStudent(student: Student): void {
        if (this.students.includes(student)) {
            throw new UniversityError("Student is already in the group");
        }

        this.students.push(student);
    }

    removeStudentById(id: number): void {
        const index = this.students.findIndex((student: Student) => student.id === id);

        if (!~index) {
            throw new UniversityError("Student not found in group");
        }

        this.students.splice(index, 1);
    }

    getAverageGroupScore(): number {
        if (this.students.length) {
            return 0;
        }

        const totalScore: number = this.students.reduce(
            (sum: number, student: Student) => sum + student.getAverageScore(),
            0
        );

        return totalScore / this.students.length;
    }

    getStudents(): Person[] {
        return [...this.students];
    }
}

class Person {
    static nextId: number = 1;

    firstName: string;
    lastName: string;
    birthDay: Date;
    id: number;
    gender: Gender;
    contactInfo: { email: string; phone: string; };
    role: Role;

    constructor(info: {
        firstName: string
        lastName: string
        birthDay: Date
        gender: Gender
        email: string
        phone: string
    }, role: Role,) {
        const { firstName, lastName, birthDay, gender, email, phone } = info;

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.id = Person.nextId++;
        this.gender = gender;
        this.contactInfo = { email, phone };
        this.role = role;
    }

    get fullName(): string {
        return `${this.lastName} ${this.firstName}`;
    }

    get age(): number {
        const today = new Date();
        let age = today.getFullYear() - this.birthDay.getFullYear();
        const monthDiff = today.getMonth() - this.birthDay.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
        ) {
            age--;
        }

        return age;
    }
}

class Teacher extends Person {
    specializations: Array<string> = [];
    courses: Course[] = [];

    constructor(info: { firstName: string; lastName: string; birthDay: Date; gender: Gender; email: string; phone: string },
                specializations: Array<string>  = []) {
        super(info, Role.Teacher);
        this.specializations = specializations;
    }

    assignCourse(course: Course): void {
        this.courses.push(course);
    }

    removeCourse(courseName: string): void {
        this.courses = this.courses.filter((course) => course.name !== courseName);
    }

    getCourses(): Course[] {
        return [...this.courses];
    }
}

class Student extends Person {
    academicPerformance: {totalCredits: number, gpa: number} = {
        totalCredits: 0,
        gpa: 0,
    };
    enrolledCourses: Course[] = [];
    status: AcademicStatus;

    constructor(info: { firstName: string; lastName: string; birthDay: Date; gender: Gender; email: string; phone: string }) {
        super(info, Role.Student);
        this.status = AcademicStatus.Active;
    }

    enrollCourse(course: Course): void {
        if (this.status !== AcademicStatus.Active) {
            throw new UniversityError(
                "Cannot enroll: Student is not in active status"
            );
        }

        this.enrolledCourses.push(course);
        this.academicPerformance.totalCredits += course.credits;
    }

    getAverageScore(): number {
        return this.academicPerformance.gpa;
    }

    updateAcademicStatus(newStatus: AcademicStatus): void {
        this.status = newStatus;
    }

    getEnrolledCourses(): Course[] {
        return [...this.enrolledCourses];
    }
}
