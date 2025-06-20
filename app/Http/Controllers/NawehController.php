<?php

namespace App\Http\Controllers;

use App\Models\Naweh;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPUnit\Framework\isArray;

class NawehController extends Controller
{
    public function create()
    {
        return Inertia::render('Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            // step 1
            'gender' => 'required|in:male,female',
            'name' => 'required|string|min:2|max:25',
            'fatherName' => 'required|string|min:2|max:25',
            'lastName' => 'required|string|min:2|max:25',
            'surName' => 'nullable|string|min:2|max:25',
            'title' => 'nullable|string|min:2|max:25',
            // step 2
            'dateOfDeath' => 'required|date',
            // 'dateOfDeath2' => 'date',
            'age' => 'required|integer|min:1',
            'bodyPlace' => 'required|string',
            'cemetery' => 'required|string',
            'funiralDate' => 'required|date',
            'prayer' => 'required|string',
            // step 3
            // men
            'menPlace' => 'required|string|min:15',
            'menTime' => 'required|string|min:20',
            'menDate' => 'required|date',
            'menNumOfDays' => 'required|integer|min:1|max:4',
            // women
            'womenPlace' => 'nullable|string|min:25',
            'womenTime' => 'nullable|string|min:25',
            'womenDate' => 'nullable|date',
            'womenNumOfDays' => 'nullable|integer|min:1|max:4',

            'info' => 'nullable|string',
            'template' => 'required|string',

            // relatives
            'relatives' => 'nullable|array',
            'relatives.*.relName' => 'required|string|min:2|max:25',
            'relatives.*.relLastName' => 'required|string|min:2|max:25',
            'relatives.*.relSurName' => 'nullable|string|min:2|max:25',
            'relatives.*.relation' => 'required|string|min:2|max:20',

            // lastNames
            'lastNames' => 'nullable|array',
            'lastNames.*' => 'nullable|string',
        ]);

        DB::transaction(function () use ($data) {
            $naweh = new Naweh();
            $naweh->gender = $data['gender'];
            $naweh->name = $data['name'];
            $naweh->father_name = $data['fatherName'];
            $naweh->last_name = $data['lastName'];
            $naweh->title = $data['title'] ?? null;
            $naweh->sur_name = $data['surName'] ?? null;
            $naweh->date_of_death = $data['dateOfDeath'];
            $naweh->date_of_death2 = $data['dateOfDeath2'] ?? null;
            $naweh->age = $data['age'];
            $naweh->body_place = $data['bodyPlace'];
            $naweh->cemetery = $data['cemetery'];
            $naweh->funiral_date = $data['funiralDate'];
            $naweh->prayer = $data['prayer'];
            $naweh->men_place = $data['menPlace'];
            $naweh->men_time = $data['menTime'];
            $naweh->men_date = $data['menDate'];
            $naweh->men_num_of_days = $data['menNumOfDays'];
            $naweh->women_place = $data['womenPlace'] ?? null;
            $naweh->women_time = $data['womenTime'] ?? null;
            $naweh->women_date = $data['womenDate'] ?? null;
            $naweh->women_num_of_days = $data['womenNumOfDays'] ?? null;
            $naweh->info = $data['info'] ?? null;
            $naweh->template = $data['template'];

            // convert lastNames to string
            if (isset($data['lastNames']) && isArray($data['lastNames'])) {
                $naweh->last_names = implode(', ', $data['lastNames']);
            } else {
                $naweh->last_names = null;
            }

            $naweh->save();

            // handle the relatives
            if (!empty($data['relatives']) && isArray($data['relatives'])) {
                foreach ($data['relatives'] as $rel) {
                    $naweh->relatives()->create([
                        'name' => $rel['relName'],
                        'last_name' => $rel['relLastName'],
                        'sur_name' => $rel['relSurName'] ?? null,
                        'relation' => $rel['relation'],
                    ]);
                }
            }
        });

        // redirect
        // return redirect()->back()->with('success', 'تم إنشاء النعوة بنجاح');
        return Inertia::render('Form', [
            'successful' => true
        ]);
    }
}
