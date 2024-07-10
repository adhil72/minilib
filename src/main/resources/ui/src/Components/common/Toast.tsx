interface Props {
    duration?: number;
    title: string;
    message: string;
    type?: "success" | "error" | "warning" | "default";
}

const createToastContainer = () => {
    const toastLayout = document.createElement("div");
    toastLayout.id = "toast-layout";
    toastLayout.className = "fixed top-0 right-0 z-40 p-5 trans";
    document.body.appendChild(toastLayout);
    return toastLayout;
}

const themes: { bg: string, text: string, "progress-dark": string, "progress-tint": string, type: "success" | "error" | "warning" | "default" }[] = [
    {
        type: "success",
        bg: "bg-green-900",
        text: "text-green-300",
        "progress-dark": "bg-green-300",
        "progress-tint": "bg-green-900"
    },
    {
        type: "error",
        bg: "bg-red-800",
        text: "text-red-300",
        "progress-dark": "bg-red-300",
        "progress-tint": "bg-red-800"
    },
    {
        type: "warning",
        bg: "bg-yellow-700",
        text: "text-yellow-300",
        "progress-dark": "bg-yellow-300",
        "progress-tint": "bg-yellow-700"
    },
    {
        type: "default",
        bg: "bg-slate-800",
        text: "text-slate-300",
        "progress-dark": "bg-tint-dark",
        "progress-tint": "bg-slate-800"
    }
]

export const createToast = ({ message, title, duration = 3000, type = "default" }: Props) => {
    let toastLayout = document.getElementById("toast-layout");
    if (!toastLayout) toastLayout = createToastContainer();

    const theme = themes.find(t => t.type === type);

    const toast = document.createElement("div");
    toast.className = `m-1 transform duration-100 opacity-0 translate-x-full h-0 rounded-xl ${theme?.bg} overflow-hidden`

    const progress = document.createElement("div");
    progress.className = `w-full h-1 z-50 ${theme?.["progress-dark"]}`;
    const progressTint = document.createElement("div");
    progressTint.className = `trans h-full ${theme?.["progress-tint"]}`;
    progressTint.style.width = "0%";
    progress.appendChild(progressTint);
    toast.appendChild(progress);

    const toastContainer = document.createElement("div");
    toastContainer.className = "md:w-[400px] p-5";

    const toastTitle = document.createElement("span");
    toastTitle.className = "text-xl font-bold text-primary";
    toastTitle.innerText = title;
    toastContainer.appendChild(toastTitle);

    const toastMessage = document.createElement("p");
    toastMessage.className = `text-justify ${theme?.text} mt-0`;
    toastMessage.innerText = message;
    toastContainer.appendChild(toastMessage);

    toast.appendChild(toastContainer);

    toastLayout.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove("h-0","translate-x-full");
        toast.classList.add("translate-x-0", "opacity-100");
    }, 0);

    const now = Date.now();
    const timerInterval = setInterval(() => {
        let progress = ((Date.now() - now) / duration) * 100;
        if (progress > 110) {
            clearInterval(timerInterval);
            toast.classList.remove("translate-x-0", "opacity-100");
            toast.classList.add("translate-x-full", "opacity-0");
            setTimeout(() => {
                toastLayout.removeChild(toast);
                close && close();
            }, 300);
            return
        }
        progressTint.style.width = `${progress}%`;
    }, 10)
}