const test_json_prettify_1 = () => {
    const json = {
        a: 'a',
        b: 3,
        c: true,
        d: {
            a: 'a',
            b: 4,
            c: true
        },
        e: [
            {
                a: 'a',
                b: '5',
                c: true
            },
            {
                a: 'a',
                b: [
                    {
                        a: 'b'
                    }
                ]
            }
        ]
    }
    const prettyJSON = prettifyJSON(json);
    assertEqual(prettyJSON, true, 'Prettify json initial test');
}


// test_json_prettify_1();