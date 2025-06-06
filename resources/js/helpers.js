export const baseURL = "/project/public";
export const publicURL = "/project/public";

// this function generates condolences string
export function generateDays(date, numOfDays) {
    const dayNames = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الاربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
    ];

    const menDayIndex = new Date(date).getDay();

    // Determine prefix word
    let prefix = numOfDays == 1 ? "يوم" : numOfDays == 2 ? "يومي" : "أيام";

    // Generate the sequence of days
    const selectedDays = Array.from(
        { length: numOfDays },
        (_, i) => dayNames[(menDayIndex + i) % dayNames.length]
    ).join(" و ");

    return `${prefix} ${selectedDays}`;
}
