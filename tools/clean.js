import del from 'del';

async function clean() {
    await del(['build/*'], { dot: true });
}

export default clean;
