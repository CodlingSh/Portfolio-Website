import sys

def letterCheck(stringToCheck: str):
    letters = []
    finalLetters = ""

    # Check string for letters and store in list
    for let in stringToCheck:
        if let not in letters and let != " ":
            letters.append(let)

    letters.sort()

    # Convert list to string for display to the user
    for char in letters:
        finalLetters += char

    return finalLetters

if __name__ == "__main__":
    final = letterCheck(sys.argv[1])
    print("# of characters: " + str(len(final)))
    print("Used characters: " + final)

