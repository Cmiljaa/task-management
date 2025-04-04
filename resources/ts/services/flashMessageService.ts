const messageDiv = document.querySelector('.message') as HTMLDivElement;

export const flashMessage = async (status: 'success' | 'error', message: string) => {
    messageDiv.innerHTML = '';

    const alertDiv = document.createElement('div');

    const messageSpan = document.createElement('span');

    alertDiv.className = `mb-4 relative flex w-full justify-between items-center p-5 text-sm 
        ${status === 'success' ? 'text-emerald-900 bg-emerald-100' : 'text-red-900 bg-red-100'} 
        rounded-md shadow-lg`;

    messageSpan.className = "text-center font-medium flex-1";

    messageSpan.textContent = message;

    alertDiv.appendChild(messageSpan);
    messageDiv.appendChild(alertDiv);

    messageDiv.classList.remove('opacity-0');

    setTimeout(() => {
        messageDiv.classList.add('opacity-0');
        messageDiv.classList.add('transition-opacity', 'duration-500');
    }, 3000);
};