// Credits to https://villevarn.dk/ (Jagge/Ville) for the C source of this functionality.
const KVAL = [
    /* 000-007 */ '0', '1', '2', '3', '4', '5', '6', '7',
    /* 008-015 */ '8', '9', ':', ';', '<', '=', '>', '?',
    /* 016-023 */ '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
    /* 024-031 */ 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    /* 032-039 */ 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    /* 040-047 */ 'X', 'Y', 'Z', '[', '\\', ']', '^', '_',
    /* 048-055 */ '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
    /* 056-063 */ 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    /* 064-071 */ 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    /* 072-079 */ 'x', 'y', 'z', '{', '|', '}', '~', '\'',
    /* 080-087 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 088-095 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 096-103 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 104-111 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 112-119 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 120-127 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 128-135 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 136-143 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 144-151 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 152-159 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 160-167 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 168-175 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 176-183 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 184-191 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 192-199 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 200-207 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 208-215 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 216-223 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 224-231 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 232-239 */ 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    /* 240-247 */ ' ', '!', '"', '#', '$', '%', '&', '\'',
    /* 248-255 */ '(', ')', '*', '+', ',', '-', '.', '/'
];

class Goto {
    static nn = new Array(8);
    static level = 0;

    static async Find(n) {
        const res = [];
        let m, t;

        if (n < 79) {
            Goto.nn[Goto.level++] = n;
            let o = "";

            for (t = Goto.level - 1; t >= 0; t--) {
                o += KVAL[Goto.nn[t] & 0xFF];
            }

            res.push(o);
            --Goto.level;

            return res;
        }

        for (t = -15; t < 79; ++t) {
            if (((m = n - t) % 10) === 0) {
                Goto.nn[Goto.level++] = t;
                const partial = await Goto.Find(m / 10);

                if (partial != null) {
                    res.push(...partial);
                }

                --Goto.level;
            }
        }

        return res;
    }
}

function generateGotos() {
    const numberInput = document.getElementById('numberInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";

    if (numberInput.trim() === "") {
        alert("Please enter a valid number");
        return;
    }

    const n = parseInt(numberInput);

    Goto.Find(n).then((result) => {
        const resultList = document.createElement('ul');
        result.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            resultList.appendChild(listItem);
        });
        resultsDiv.appendChild(resultList);
    }).catch((error) => {
        console.error(error);
    });
}