import React from 'react';
import style from './About.module.css';

const About = () => {
    return (
        <div className={style["about-container"]}>
            This TodoList App is a simple and intuitive task management tool designed to help you stay organized
            and productive. With this app, you can easily create new tasks, mark them as completed once they're done,
            delete tasks that are no longer needed, and edit existing tasks to update their details. Its user-friendly
            interface ensures that managing your to-do list is effortless, allowing you to focus on what's important and
            efficiently track your progress.
        </div>
    );
};

export default About;
