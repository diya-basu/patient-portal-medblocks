import React, { useEffect } from 'react';
import './RotatingIcons.css';

export default function RotatingIcons({ setView }) {
    useEffect(() => {
        const icons = [
            { icon: 'fa-solid fa-user', text: 'Register Patient' },
            { icon: 'fa-brands fa-react', text: 'Developed on React' },
            { icon: 'fa-solid fa-notes-medical', text: 'Admin Portal' },
            { icon: 'fa-solid fa-database', text: 'Database -> Postgresql' },
            { icon: 'fa-solid fa-window-restore', text: 'Browser-based tool' },
            { icon: 'fa-solid fa-code', text: 'Developed by Diya Basu' },
        ];

        const container = document.getElementById('circle');
        container.innerHTML = '';

        const containerWidth = 200;
        const containerHeight = 120;
        const radius = Math.min(containerWidth, containerHeight) / 2;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;

        icons.forEach((item, index) => {
            const angle = (index / icons.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - 20;
            const y = centerY + radius * Math.sin(angle) - 20;

            const wrapper = document.createElement('div');
            wrapper.className = 'icon-wrapper';
            wrapper.style.left = `${x}px`;
            wrapper.style.top = `${y}px`;

            const icon = document.createElement('i');
            icon.className = `fas ${item.icon} fa-2x`;

            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = item.text;

            wrapper.appendChild(icon);
            wrapper.appendChild(tooltip);

            wrapper.addEventListener('click', () => {
                if (item.text === 'Admin Portal') {
                    setView('admin');
                }
            });

            wrapper.addEventListener('click', () => {
                if (item.text === 'Register Patient') {
                    setView('patient');
                }
            });

            wrapper.addEventListener('click', () => {
                if (item.text === 'Developed by Diya Basu') {
                    window.open('https://www.diyabasu.com', '_blank');
                }
            });


            container.appendChild(wrapper);
        });
    }, [setView]);

    return <div className="circle-container" id="circle" />;
}
