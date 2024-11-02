enum FormatOption {
    Default = "Default",
    ShortTime = "Short Time",
    LongTime = "Long Time",
    ShortDate = "Short Date",
    LongDate = "Long Date",
    ShortDateTime = "Short Date/Time",
    LongDateTime = "Long Date/Time",
    RelativeTime = "Relative Time",
}

function formatTimestamp(dateString: string, format: FormatOption): string {
    let date = new Date(dateString);
    let timestamp = Math.floor(date.getTime() / 1000); // Unix-Timestamp in Sekunden

    switch (format) {
        case FormatOption.Default:
            return `<t:${timestamp}>`;
        case FormatOption.ShortTime:
            return `<t:${timestamp}:t>`;
        case FormatOption.LongTime:
            return `<t:${timestamp}:T>`;
        case FormatOption.ShortDate:
            return `<t:${timestamp}:d>`;
        case FormatOption.LongDate:
            return `<t:${timestamp}:D>`;
        case FormatOption.ShortDateTime:
            return `<t:${timestamp}:f>`;
        case FormatOption.LongDateTime:
            return `<t:${timestamp}:F>`;
        case FormatOption.RelativeTime:
            return `<t:${timestamp}:R>`;
        default:
            throw new Error("Invalid format option.");
    }
}

function generateTimestamp(): void {
    let dateInputElement = document.getElementById("dateInput") as HTMLInputElement;
    let formatOptionElement = document.getElementById("formatOption") as HTMLSelectElement;
    let resultElement = document.getElementById("result");
    let copyButton = document.getElementById("copyButton");

    if (dateInputElement && formatOptionElement && resultElement && copyButton) {
        let dateInput = dateInputElement.value;
        let formatOption = formatOptionElement.value as FormatOption;
        let result = formatTimestamp(dateInput, formatOption);
        resultElement.innerText = result;
        copyButton.style.display = "inline";
    } else {
        throw new Error("A required element was not found.");
    }
}

function copyToClipboard(): void {
    let resultElement = document.getElementById("result");

    if (resultElement) {
        let resultText = resultElement.innerText;
        navigator.clipboard.writeText(resultText).then(() => {
            showToast("Timestamp was copied to the clipboard!");
        });
    } else {
        throw new Error("Result element not found.");
    }
}

function showToast(message: string): void {
    let toast = document.getElementById("toast");

    if (toast) {
        toast.innerText = message;
        toast.className = "show";
        setTimeout(() => {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    } else {
        throw new Error("Toast element not found.");
    }
}
