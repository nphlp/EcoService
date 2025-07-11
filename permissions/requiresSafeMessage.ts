"use server";

export const requiresSafeMessage = async (
    isSafeMessageDisabled: boolean = false,
    functionName: string,
    model: string,
    method: string,
) => {
    // If argument is true, return
    if (isSafeMessageDisabled) return;

    console.log(
        "\n┏━ Unsafe Server Action called... ✏️ ",
        "\n┃",
        `\n┃  Name   -> ${functionName} ✅`,
        `\n┃  Model  -> ${model}`,
        `\n┃  Method -> ${method}`,
        "\n┃",
        "\n┃  Make sure to set up security checks:",
        "\n┃",
        "\n┃    1. Wrap the `/services/actions` basic action in a safe `/process` action",
        "\n┃    2. Use Zod to validate user input data",
        "\n┃    3. Use hasPermission() function to check if the user has the required permissions",
        "\n┃    4. Disable this message by adding `true` to action calls",
        "\n┗━",
        "\n",
    );
};
