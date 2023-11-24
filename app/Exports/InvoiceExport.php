<?php

namespace App\Exports;

use Maatwebsite\Excel\Sheet;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use Maatwebsite\Excel\Concerns\FromCollection;


// create custom macro to set cell style by using `phpspreadsheet library` that are not available in laravel-excel package
Sheet::macro('styleCells', function (Sheet $sheet, string $cellRange, array $style) {
    $sheet->getDelegate()->getStyle($cellRange)->applyFromArray($style);
});

// create custom macro to merge cell by using `phpspreadsheet library` that are not available in laravel-excel package
Sheet::macro('mergeCells', function (Sheet $sheet, string $cellRange) {
    $sheet->getDelegate()->mergeCells($cellRange);
});


class InvoiceExport implements WithHeadings, WithEvents, WithTitle
{
    public $exportData;
    public $endTableColumn;
    public $tableHeader;
    public function __construct($exportData, $tableHeader)
    {
        $this->exportData = $exportData;
        $this->tableHeader = $tableHeader;
    }

    public function headings(): array
    {
        return [
            $this->tableHeader
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet->freezePane('D2');
                # style array
                $styleArray = [
                    'headerFont' => [
                        'bold' => true,
                        'size' => 14
                    ],
                    'centerAlign' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    'verticalAlign' => [
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    'tableHeader' => [
                        'bold' => true
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'color' => ['rgb' => 'c5e3f6']
                    ],
                    'borderStyle' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN
                        ]
                    ],
                    'red' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'color' => ['rgb' => 'ff304f']
                    ],
                ];
                $this->setColumnWidth($event, count($this->tableHeader));
                $this->setTitleAndStyle($event, $styleArray);
                $this->setExportdata($event, $styleArray);
                $event->sheet->getDelegate()->getRowDimension(1)->setRowHeight(50);
                $event->sheet->getDelegate()->getStyle($event->sheet->calculateWorksheetDimension())->getAlignment()->setWrapText(true);
            }
        ];
    }

    public function setColumnWidth($event, $headerCount)
    {
        $index = config('ZERO');
        $headerCount -= config('ONE');
        # prepare column width as dynamic

        $letters = [];
        foreach (range('A', 'Z') as $first) {
            array_push($letters, $first);
        }

        foreach (range('A', 'A') as $second) {
            foreach (range('A', 'Z') as $third) {
                array_push($letters, $second . $third);
            }
        }
        foreach ($letters as $alphabet) {
            # check loop count is greater than column count, it mean, terminate loop
            if ($headerCount > $index) {
                $event->sheet->getColumnDimension("A")->setWidth(30);
                # set column width
                if ($alphabet == "D" || $alphabet == "H") {
                    $event->sheet->getColumnDimension($alphabet)->setWidth(20);
                } elseif ($alphabet == "J") {
                    $event->sheet->getColumnDimension($alphabet)->setWidth(25);
                } else {
                    $event->sheet->getColumnDimension($alphabet)->setWidth(17);
                }
                $this->endTableColumn = $alphabet;
            } else {
                break;
            }
            $index++;
        }
    }

    public function setExportdata($event, $styleArray)
    {
        $row = 2;
        $no = 1;
        $column = 1;
        $lastExcelRow = count($this->exportData);
        // $columnAlpa = Coordinate::stringFromColumnIndex($column);
        foreach ($this->exportData as $key => $data) {
            $event->sheet->setCellValue("A" . $row, $data["receipt_no"]);
            $event->sheet->setCellValue("B" . $row, $data["date"]);
            $event->sheet->setCellValue("C" . $row, $data["collection_status"]);
            $event->sheet->setCellValue("D" . $row, $data["location"]);
            $event->sheet->setCellValue("E" . $row, $data["box"]);;
            $event->sheet->setCellValue("F" . $row, $data["sender_name"]);
            $event->sheet->setCellValue("G" . $row, $data["sender_address"]);
            $event->sheet->setCellValue("H" . $row, $data["sender_contact_no"]);
            $event->sheet->setCellValue("I" . $row, $data["sea_or_air"]);
            $event->sheet->setCellValue("J" . $row, $data["details_of_cargo"]);
            $event->sheet->setCellValue("K" . $row, $data["weight"]);
            $event->sheet->setCellValue("L" . $row, $data["ygn_home_pickup"]);
            $event->sheet->setCellValue("M" . $row, $data["what_sending"]);
            $event->sheet->setCellValue("N" . $row, $data["how_in_sg"]);
            $event->sheet->setCellValue("O" . $row, $data["payment_type"]);
            $event->sheet->setCellValue("P" . $row, $data["receiver_name"]);
            $event->sheet->setCellValue("Q" . $row, $data["receiver_address"]);
            $event->sheet->setCellValue("R" . $row, $data["receiver_postalcode"]);
            $event->sheet->setCellValue("S" . $row, $data["receiver_contact_no"]);
            $event->sheet->setCellValue("T" . $row, $data["food_weight"]);
            $event->sheet->setCellValue("U" . $row, $data["food_price"]);
            $event->sheet->setCellValue("V" . $row, $data["clothes_weight"]);
            $event->sheet->setCellValue("W" . $row, $data["clothes_price"]);
            $event->sheet->setCellValue("X" . $row, $data["frozen_food_weight"]);
            $event->sheet->setCellValue("Y" . $row, $data["frozen_food_price"]);
            $event->sheet->setCellValue("Z" . $row, $data["other_weight"]);
            $event->sheet->setCellValue("AA" . $row, $data["other_price"]);
            $event->sheet->setCellValue("AB" . $row, $data["cosmetic_weight"]);
            $event->sheet->setCellValue("AC" . $row, $data["cosmetic_price"]);
            $event->sheet->setCellValue("AD" . $row, $data["email"]);
            $event->sheet->setCellValue("AE" . $row, $data["addational_instruction"]);
            $event->sheet->setCellValue("AF" . $row, $data["storage_type"]);
            $event->sheet->setCellValue("AG" . $row, $data["how_in_ygn"]);
            $event->sheet->setCellValue("AH" . $row, $data["sg_home_pickup"]);
            $event->sheet->setCellValue("AI" . $row, $data["total_price"]);
            $event->sheet->setCellValue("AJ" . $row, $data["total_weight"]);
            $event->sheet->setCellValue("AK" . $row, $data["no_of_package"]);
            $event->sheet->setCellValue("AL" . $row, $data["received"]);
            $event->sheet->setCellValue("AM" . $row, $data["handling"]);
            $event->sheet->setCellValue("AN" . $row, $data["balance"]);

            $event->sheet->styleCells(
                "A$row:" . $this->endTableColumn . $row,
                [
                    'borders' => $styleArray['borderStyle'],
                    'alignment' => $styleArray['verticalAlign'],
                ]
            );
            // $event->sheet->styleCells(
            //     "AN$row",
            //     [
            //         'fill' => $styleArray['fill']
            //     ]
            // );

            if ($lastExcelRow > $no) {
                $row++;
                $no++;
            }
        }
    }

    public function setTitleAndStyle($event, $styleArray)
    {
        # set title style
        $event->sheet->styleCells(
            'A1:AN1',
            [
                'font' => $styleArray['tableHeader'],
                'alignment' => $styleArray['centerAlign'],
                'fill' => $styleArray['fill'],
                'borders' => $styleArray['borderStyle']
            ]

        );
    }

    public function title(): string
    {
        return "Monthly Invoice";
    }
}
