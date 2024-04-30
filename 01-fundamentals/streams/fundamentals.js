import { Readable } from 'node:stream';

// process.stdin.pipe(process.stdout);

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout( () => {
            if (i > 10) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf);
            }
        }, 500)
    }
}

new OneToHundredStream().pipe(process.stdout)